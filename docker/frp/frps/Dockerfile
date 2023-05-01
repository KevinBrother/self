FROM snowdreamtech/frps

COPY frps.ini /etc/frp/frps.ini

EXPOSE 7000 7500 9000

CMD ["frps", "-c", "/etc/frp/frps.ini"]