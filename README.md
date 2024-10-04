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

Here's a config that blocks youtube.com every week day at 9:00 AM until 4:00 PM.

Open `crontab` with `sudo crontab -e`

Add the following lines to the file:

```
0 9 * * 1-5 /usr/bin/node /path/to/editHosts.js add
0 16 * * 1-5 /usr/bin/node /path/to/editHosts.js remove
```

Replace `/path/to/cron-site-blocker` with the path to the `cron-site-blocker` directory.

Check if the job is working by running `crontab -l` and checking if the jobs are listed.

🤓 Enjoy a productive workday!
