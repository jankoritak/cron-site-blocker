const fs = require("fs");
const os = require("os");

const HOSTS_FILE_PATH = "/etc/hosts";

const HOST_WWW_PREFIX = "www.";
const HOST_LOCAL_HOST = "127.0.0.1";

const BLOCKED_HOSTS_LIST = ["youtube.com", "reddit.com"];

const buildHostsLine = (host, includeWWW = false) =>
  includeWWW
    ? HOST_LOCAL_HOST + " " + HOST_WWW_PREFIX + host
    : HOST_LOCAL_HOST + " " + host;

const addHostsEntry = () => {
  try {
    let hostsFile = fs.readFileSync(HOSTS_FILE_PATH, "utf8");

    if (BLOCKED_HOSTS_LIST.length > 0) {
      hostsFile += os.EOL;
    }

    BLOCKED_HOSTS_LIST.forEach((blockedHost) => {
      if (!hostsFile.includes(blockedHost)) {
        hostsFile += buildHostsLine(blockedHost) + os.EOL;
        hostsFile += buildHostsLine(blockedHost, true) + os.EOL;

        fs.writeFileSync(HOSTS_FILE_PATH, hostsFile, "utf8");

        console.log("Added", blockedHost, "to", HOSTS_FILE_PATH);
      } else {
        console.log("Host", blockedHost, "already in", HOSTS_FILE_PATH);
      }
    });
  } catch (err) {
    console.error("Error editing hosts file:", err);
  }
};

const removeHostsEntry = () => {
  try {
    let hostsFile = fs.readFileSync(HOSTS_FILE_PATH, "utf8");

    BLOCKED_HOSTS_LIST.forEach((blockedHost) => {
      if (hostsFile.includes(blockedHost)) {
        hostsFile = hostsFile.replace(buildHostsLine(blockedHost), "");
        hostsFile = hostsFile.replace(buildHostsLine(blockedHost, true), "");

        fs.writeFileSync(HOSTS_FILE_PATH, hostsFile.trim(), "utf8");

        console.log("Removed", blockedHost, "from", HOSTS_FILE_PATH);
      } else {
        console.log("Host", blockedHost, "not in", HOSTS_FILE_PATH);
      }
    });
  } catch (err) {
    console.error("Error editing hosts file:", err);
  }
};

const editHosts = () => {
  const action = process.argv[2];

  if (!action) {
    console.error('Please provide an action: "add" or "remove"');
    process.exit(1);
  }

  switch (action) {
    case "add":
      console.log("Add hosts entry");
      addHostsEntry();
      break;
    case "remove":
      console.log("Remove hosts entry");
      removeHostsEntry();
      break;
    default:
      console.log("Invalid choice. Please try again.");
      break;
  }
};

editHosts();
