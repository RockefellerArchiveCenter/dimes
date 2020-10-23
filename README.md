# DIMES

A React web application which provides the front-end user interface for the online discovery of archival collections, objects, and agents at the Rockefeller Archive Center.

DIMES is part of [Project Electron](https://github.com/RockefellerArchiveCenter/project_electron), an initiative to build sustainable, open and user-centered infrastructure for the archival management of digital records at the [Rockefeller Archive Center](http://rockarch.org/).

## Local Development

Install [git](https://git-scm.com/) and clone the repository

    $ git clone https://github.com/RockefellerArchiveCenter/dimes.git

With [Docker](https://store.docker.com/search?type=edition&offering=community) installed, run docker-compose from the root directory

    $ docker-compose up

Once the application starts successfully, you should be able to access the application in your browser at `http://localhost:3000`

When you're done, shut down docker-compose

    $ docker-compose down

Or, if you want to remove all data

    $ docker-compose down -v


## Dev deployment

Updated images are built each time a commit is pushed to base. To deploy in vSphere, first update the image by pulling the most recent version:

    $ docker -H {vsphere host}{vsphere port} --tlsverify pull rockarch/dimes:latest

Then stop the running container:

    $ docker -H {vsphere host}{vsphere port} --tlsverify stop rockarch/dimes:latest

Finally, start the updated container:

    $ docker -H {vsphere host}{vsphere port} --tlsverify run -d -p 3001:80 rockarch/dimes:latest

DIMES will then be available at the vSphere host, port 3001.


## License

This code is released under an [MIT License](LICENSE).
