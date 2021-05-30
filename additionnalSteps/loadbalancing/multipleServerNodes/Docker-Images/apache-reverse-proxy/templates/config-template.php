<?php
	$dynamic_app_1 = getenv('DYNAMIC_APP_1');
	$static_app_1 = getenv('STATIC_APP_1');
	$dynamic_app_2 = getenv('DYNAMIC_APP_2');
	$static_app_2 = getenv('STATIC_APP_2');
?>

<VirtualHost *:80>
	ServerName demo.res.ch
	
	<Proxy balancer://dynamic-app>
		BalancerMember 'http://<?php print "$dynamic_app_1"?>'
		BalancerMember 'http://<?php print "$dynamic_app_2"?>'
	</Proxy>
	
	<Proxy balancer://static-app>
		BalancerMember 'http://<?php print "$static_app_1"?>'
		BalancerMember 'http://<?php print "$static_app_2"?>'
	</Proxy>
	
	ProxyPass '/api/animals/' 'balancer://dynamic-app/'
	ProxyPassReverse '/api/animals/' 'balancer://dynamic-app/'
	
	ProxyPass '/' 'balancer://static-app/'
	ProxyPassReverse '/' 'balancer://static-app/'
</VirtualHost>

