![1.1.1.1 Logo](https://developers.cloudflare.com/1.1.1.1/img/1.1.1.1-fancycolor.gif)

## The free service that makes your Internet faster & more secure.
Your Internet service provider can see every site and app you use—even if they’re encrypted. Some providers even sell this data or use it to target you with ads. 1.1.1.1 prevents anyone from snooping on you by encrypting more of the traffic leaving your computer.

1.1.1.1 is a service provided by Cloudflare, this Windows Application is here to help more people use it. I am not affiliated with Cloudflare in any way.

The app has one simplistic look, with one switch to turn on and off the 1.1.1.1 service.
![1.1.1.1 Windows](https://i.gyazo.com/8858804cabc27b8b8b0cf188be4fa739.png)

[Find out more about 1.1.1.1](https://1.1.1.1)

## Installation and Use
#### Requirements
* Windows 7 or later.
* An Intel Pentium 4 processor or later that's SSE2 capable
* 512 MB of RAM

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

1. Clone the repo and install npm
```bash
# Clone this repository
git clone https://github.com/holmseyy/1.1.1.1
# Go into the repository
cd 1.1.1.1
# Install dependencies
npm install
# Run the app
npm start
```

2. Then, give Node.js elevated privlages (UAC Administrator). This is required as much of the backend work involved in changing DNS addresses involves using Windows Shell. (Shown below)

![How to elevate UAC to Admin](https://i.gyazo.com/948e7f1460a11e2f691af005ce8ddd7d.gif)

## How it works
It's actually really simple, enabling 1.1.1.1 (and it's backup 1.0.0.1) is done through this command
```bash
wmic nicconfig where (IPEnabled=TRUE) call SetDNSServerSearchOrder ("1.1.1.1", "1.0.0.1")
```

And it's disabled again using this command
```bash
wmic nicconfig where (IPEnabled=TRUE) call SetDNSServerSearchOrder ()
```

And apart from a few checks I've built in inbetween, that's about all that glorified switch in the middle is doing.

## Development
Help welcome, feel free to do whatever you like, if it works well and it's secure, i'll put it on master.
