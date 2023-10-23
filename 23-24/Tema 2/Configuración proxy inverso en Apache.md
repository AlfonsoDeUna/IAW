# Configuración de un Proxy Inverson en Apache

## INTRODUCCIÓN

Un proxy es un elemento que se interpone entre un cliente y un servidor para recibir él las peticiones. ¿Con qué función? pues tenemos
que definir qué función queremos que realice, desde un simple pasabola, recoge la información y la vuelve a dejar en la red, a realizar
filtros a través de la información que viene, no deja de ser un elmento entre nuestros servidores de BackEnd y los usuarios.

En este caso tiene que ver con una función de protección y contingencia, de ese modo nuestro servidor puede estar conectado a la red interna
de los servidores y que el usuario acceda al proxy no al backend directamente.

Si en un momento dado detectamos un problema de seguridad podemos desactivar el proxy para que el tráfico no llegue a nuestros servidores.

## ESQUEMA

![Configuración proxy inverso en Apache](https://httpd.apache.org/docs/trunk/es/images/reverse-proxy-arch.png)

## MÓDULOS A ACTIVAR

mod_proxy
mod_proxy_balancer
mod_proxy_hcheck

## DIRECTIVA PROXYPASS

La directiva ProxyPass especifica el mapeo de peticiones entrantes al servidor backend (o un cluster de servidores conocido como grupo de Balanceo). El ejemplo más sencillo hace proxy de todas las solicitudes ("/") a un solo backend:

```
ProxyPass "/"  "http://www.example.com/"
ProxyPassReverse "/"  "http://www.example.com/"

```

**PROXYPASSREVERSE** SUELE SER NECESARIO.

## PRÁCTICA

VAMOS A UTILIZAR EL XAMPP DE WINDOWS PARA QUE APUNTE AL APACHE SERVER DE NUESTRA MÁQUINA VIRTUAL QUE HARÁ DE SERVIDOR BACKEND
1. ACTIVAR LOS MODULOS EN XAMMP HTTPD.CONF
2. COMPRUEBA QUE DESDE TU WINDOWS (HOST) PUEDES REALIZAR UN PING A LA MÁQUINA VIRTUAL Y QUE EL APACHE ESTÁ FUNCIONANDO DE MODO QUE, A TRAVÉS DEL NAVEGADOR LLEGUES A LAS
3. PÁGINAS DEL SERVER
4. CONFIGURAR LAS DIRECTIVAS LA DIRECCIÓN TIENE QUE SER HTTP://IP_MAQUINA_VIRTUAL LOCATION: "/" Y SALVA EL FICHERO HTTPD.CONF
5. REINICIA EL APACHE DE XAMPP
6. PRUEBA QUE HAS CONFIGURADO EL PROXY SI PONES EN UN NAVEGADOR 127.0.0.1 VERÁS LA PÁGINA DEL APACHE DE LA MÁQUINA VIRTUAL.

### PRUEBA A REALIZARLO CON UN COMPAÑERO ENTRE DOS ORDENADORES.

## EXTENSIÓN DE LA PRÁCTICA: BALANCEADOR DE APACHE

PUEDES REALIZARLO CON DOS MÁQUINAS VIRTUALES, O CON DOS COMPAÑEROS

Aunque los ejemplos de más arriba son útiles, tienen la deficiencia en la que si el backend se cae, o recibe mucha carga, hacer proxy de esas solicitudes no aporta grandes beneficios. Lo que se necesita es la habilidad de definir un grupo de servidores backend que puedan gestionar esas peticiones y que el proxy inverso pueda balancear la carga y aplicar la tolerancia a fallos entre los backend. A veces a este grupo se le llama cluster, pero el término para Apache httpd es balanceador. Se puede definir un balanceador usando las directivas <Proxy> and BalancerMember como se muestra a continuación:

```
<Proxy balancer://myset>
    BalancerMember http://ip_MAQUINA_1
    BalancerMember http://IP_MAQUINA_2
    ProxySet lbmethod=bytraffic
</Proxy>

ProxyPass "/"  "balancer://myset/"
ProxyPassReverse "/"  "balancer://myset/"

```

### MODIFICACIÓN: QUEREMOS QUE LA MÁQUINA 2 GENERE MÁS TRÁFICO EN UNA RELACIÓN DE 3:1 SOBRE LA MÁQUINA 1 Y CON UN TIMEOUT DE 1 SG

Hay que modificar la siguiente página:

```
BalancerMember http://IP_MAQUINA_2 loadfactor=3 timeout=1
```

# Anexos:
* https://httpd.apache.org/docs/trunk/es/howto/reverse_proxy.html
* https://httpd.apache.org/docs/trunk/es/howto/

![Configuración proxy inverso en Apache](https://www3.gobiernodecanarias.org/medusa/wiki/images/0/0e/Cc-by-nc-sa_icon.png) {width=200 height=400}


