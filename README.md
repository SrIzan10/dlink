# dlink

A really simple proxy for the TP-Link DSP-W115 and DSP-W245 smart plugs. Created with Home Assistant in mind, though setup has to be done manually.

## Installation

A Docker image is available on Docker Hub, so you can run the app with the following command:

```bash
docker run -d -p 4000:4000 --name dlink -e IP=ip -e PIN=123456 --restart unless-stopped srizan10/dlink
```
Or with docker-compose:
```yaml
services:
  dlink:
    image: srizan10/dlink
    container_name: dlink
    environment:
      - IP=ip
      - PIN=123456
    ports:
      - 4000:4000
    restart: unless-stopped
```

## API routes
The routes require absolutely no authentication, so make sure to run the app in a secure environment.

### GET /status
Returns the status of the plug.

### POST /on
Turns the plug on.

### POST /off
Turns the plug off.