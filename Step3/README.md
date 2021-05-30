# Step 3 - Reverse proxy using Apache

> Author : Blanc Jean-Luc
> Date : 30.05.2021

## Description

In this step, we will simply setup a reverse proxy server using hard-coded IP addresses.

In order for the proxy server to be useful we need to start the containers in the given order to assure we use the correct IP addresses we had to hard-code : 

1. apache-reverse-proxy : 172.17.0.2

2. express-image : 172.17.0.3

3. apache-php : 172.17.0.4

## Container

First to start we need to create a container for our apache reverse proxy server.
To do so we will use this dockerfile : 

```
FROM php:7.2-apache
COPY conf/ /etc/apache2

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```

Once we have finished creating our dockerfile, we need to enter those 2 commands so we can build and run our container : 

```
docker build -t res/apache_rp .
docker run -p 8080:80 res/apache_rp
```

## Config file

Here is the content of the 001-reverse-proxy.conf file

```
<VirtualHost *:80>
	ServerName demo.res.ch
	
	ProxyPass "/api/animals/" "http://172.17.0.3:3000/"
	ProxyPassReverse "/api/animals/" "http://172.17.0.3:3000/"
	
	ProxyPass "/" "http://172.17.0.4:80/"
	ProxyPassReverse "/" "http://172.17.0.4:80/"
</VirtualHost>
```

From this configuration file we understand that if we access this address : **demo.res.ch/api/animals/** then we will access the dynamic server JSON Package content, if we access any other address of the **demo.res.ch** domain then we will access the static server with the bootstrap template we set up earlier.

## Host name

Here is the content we need to add to the hosts file (On Windows) :

```
127.0.0.1	demo.res.ch
```

Path : C:\Windows\System32\drives\etc\hosts



## Result

Here is the result if we reach the demo.res.ch/api/animals/ page :

 ![image-20210530204015483](/images/image1.png)

Here is the result if we reach any other page from demo.res.ch/ : 

![image-20210530203943617](/images/image2.png)



## Why this configuration is fragile

This configuration is fragile since it is static and therefor depends on the user starting the containers in a given order. It would be better to have a dynamic configuration which would directly take the containers IP correctly without having to hard-code it in the .conf file.

## Static and Dynamic servers can't be reached directly 

Since we only mapped the reverse proxy, it is our only entry-point in the container's network. While we can't reach the dynamic and static server, we can reach the proxy since we mapped its ports to our host machine 8080 ports when we started the proxy container.







