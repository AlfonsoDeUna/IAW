# Introducción
La seguridad es un elemento fundamental en la web moderna. Un método común para asegurar la información es mediante el uso de certificados SSL, que cifran la conexión entre el navegador del usuario y el servidor. Aunque lo ideal es adquirir certificados SSL de autoridades certificadas, hay ocasiones en las que podrías querer generar tu propio certificado autofirmado para pruebas o ambientes de desarrollo. En este resumen, te guiaré a través del proceso de creación de un certificado SSL autofirmado para Apache en Ubuntu 20.04.

## Pasos para crear un certificado SSL autofirmado para Apache en Ubuntu 20.04:

1. **Actualización de paquetes**:
   - Abre una terminal.
   - Ejecuta: `sudo apt update && sudo apt upgrade`

2. **Instalación de Apache** (si aún no lo tienes instalado):
   - Ejecuta: `sudo apt install apache2`

3. **Activación del módulo SSL**:
   - Ejecuta: `sudo a2enmod ssl`

4. **Reiniciar Apache**:
   - Ejecuta: `sudo systemctl restart apache2`

5. **Creación del directorio para el certificado**:
   - Ejecuta: `sudo mkdir /etc/apache2/ssl`

6. **Generar el certificado SSL autofirmado**:
   - Ejecuta el siguiente comando y completa los campos solicitados. Estos campos serán parte del certificado, pero como es un certificado autofirmado, no tienen que ser exactamente correctos:
     ```
     sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/apache2/ssl/apache.key -out /etc/apache2/ssl/apache.crt
     ```

7. **Configurar Apache para usar SSL**:
   - Edita el archivo default-ssl:
     ```
     sudo nano /etc/apache2/sites-available/default-ssl.conf
     ```
   - Busca las líneas que comienzan con `SSLCertificateFile` y `SSLCertificateKeyFile` y modifícalas para que apunten a los archivos del certificado y la llave que acabas de generar:
     ```
     SSLCertificateFile /etc/apache2/ssl/apache.crt
     SSLCertificateKeyFile /etc/apache2/ssl/apache.key
     ```

8. **Activar el sitio default-ssl y reiniciar Apache**:
   - Ejecuta: `sudo a2ensite default-ssl.conf`
   - Reinicia Apache: `sudo systemctl restart apache2`

9. **Probar el certificado**:
   - Abre un navegador y accede a `https://tu_direccion_ip` o `https://tu_dominio`. Deberías ver una advertencia sobre el certificado no seguro porque es autofirmado. Aun así, puedes proceder para ver tu sitio con una conexión cifrada.

**Conclusión**: 
Ahora has configurado con éxito un certificado SSL autofirmado en Apache en Ubuntu 20.04. Recuerda que este tipo de certificados es útil para pruebas y ambientes de desarrollo, pero no se recomienda para entornos de producción debido a la falta de verificación por parte de una autoridad certificadora.
