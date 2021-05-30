# Step 5 - Dynamic configuration for the reverse proxy

> Author : Blanc Jean-Luc
> Date : 30.05.2021

## Description

In this step, we had to edit the reverse proxy server in order for him to receive the ip addresses he will need to use in the .conf file. To do so we will use environment variables from Docker.

## Container

First to start we need to create a container for our apache reverse proxy server.
To do so we will use this dockerfile : 

```
FROM php:7.2-apache

COPY apache2-foreground /usr/local/bin/
COPY conf/ /etc/apache2
COPY templates /var/apache2/templates

RUN apt-get update && apt-get install -y vim
RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```

Once we have finished creating our dockerfile, we need to enter those 2 commands so we can build and run our container : 

```
docker build -t res/apache_rp_2 .
docker run -d -e STATIC_APP=172.17.0.4:80 -e DYNAMIC_APP=172.17.0.3:3000 --name apache_rp_2 -p 8080:80 res/apache_rp_2

```

in the docker run command we added as environment variable both the static and the dynamic ip addresses as well as ports used to contact them. Our proxy-server now knows everything needed to start the entire HTTP infra.

## Apache2-Foreground file

Here is what we had to add to the [apache2-foreground](https://github.com/docker-library/php/blob/master/apache2-foreground) file for him to copy our dynamic configuration for the .conf file

```
# Add setup for RES lab
echo "Setup for the RES lab..."
echo "Static app URL: $STATIC_APP"
echo "Dynamic app URL: $DYNAMIC_APP"
php /var/apache2/templates/config-template.php > /etc/apache2/sites-available/001-reverse-proxy.conf
```



## Config-template

Here is the config-template file edited in order to use environment variables : 



```
<?php
	$dynamic_app = getenv('DYNAMIC_APP');
	$static_app = getenv('STATIC_APP');
?>

<VirtualHost *:80>
	ServerName demo.res.ch
	
	ProxyPass '/api/animals/' 'http://<?php print "$dynamic_app"?>/'
	ProxyPassReverse '/api/animals/' 'http://<?php print "$dynamic_app"?>/'
	
	ProxyPass '/' 'http://<?php print "$static_app"?>/'
	ProxyPassReverse '/' 'http://<?php print "$static_app"?>/'
</VirtualHost>
```



