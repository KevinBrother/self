FROM snowdreamtech/frpc

COPY frpc.ini /etc/frp/frpc.ini

EXPOSE 7000 7500 9000

CMD ["frpc", "-c", "/etc/frp/frpc.ini"]

# cd docker/frp/frpc && docker build -t rpa-test-frpc . 
