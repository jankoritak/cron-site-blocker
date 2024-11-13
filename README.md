# ⏰ ⛔ cron-site-blocker

Note: This is a tiny workflow that I use daily for productivity.

A Node.js script that blocks and unblocks selected websites (resp. hosts), e.g. youtube.com, reddit.com.

In combination with a CRON job, it can be used to block access to selected websites in a given time frame on daily basis.

## Configuration

Open `editHosts.js` and change the `BLOCKED_HOSTS_LIST` variable to the list of websites you want to block. E.g.

```
const BLOCKED_HOSTS_LIST = ["youtube.com", "reddit.com"];
```

## Manual usage

To block the configured websites (hosts) manually, run:

```
node editHosts.js add
```

To unblock the configured websites (hosts) manually, run:

```
node editHosts.js remove
```

## CRON job

To block/unblock the configured websites (hosts) automatically, you need to create a CRON job.

Here's a config that blocks `BLOCKED_HOSTS_LIST` every week day at 9:00 AM until 4:00 PM.

Open `crontab` with `sudo crontab -e`

Add the following lines to the file:

```
0 9 * * 1-5 sudo /usr/local/bin/node /path/to/cron-site-blocker/editHosts.js add >> /path/to/cron-site-blocker/cron.log 2>&1
0 16 * * 1-5 sudo /usr/local/bin/node /path/to/cron-site-blocker/editHosts.js remove >> /path/to/cron-site-blocker/cron.log 2>&1
```

Replace `/path/to/cron-site-blocker` with the path to the `cron-site-blocker` directory.

Since we're editing the hosts file, we need to run the script as root. We already have the `sudo` prefix in the cron job, but we also need to allow the passwordless sudo access.

To do this, run `sudo visudo` and add the following line to the file:

```
your-user-name ALL=(ALL) NOPASSWD: /usr/local/bin/node /path/to/cron-site-blocker/editHosts.js add
your-user-name ALL=(ALL) NOPASSWD: /usr/local/bin/node /path/to/cron-site-blocker/editHosts.js remove
```

Test the permissions by running

```
sudo /usr/local/bin/node /Users/jankoritak/Documents/Work/Personal/cron-site-blocker/editHosts.js add
```

and make sure `/etc/hosts` has been edited with your `BLOCKED_HOSTS_LIST`.

Check if the job is working by running `crontab -l` and checking if the jobs are listed.

## Permissions

If you're on MacOS, you may need to add the script to access the file system via `Security & Permissions -> Full Disc Access`.

🤓 Enjoy a productive workday!

## Debugging

### Using CRON?

1. Make sure the CRON job is working by running `crontab -l` and checking if the jobs are listed.
2. Check the log file for errors.

### Using the script manually?

1. Check the log file for errors.
