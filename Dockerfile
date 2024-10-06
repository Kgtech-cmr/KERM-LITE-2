FROM quay.io/kgtech-cmr/KERM-LITE-2:latest
RUN git clone https://github.com/kgtech-cmr/KERM-LITE-2 /root/KERM-LITE-2/
WORKDIR /root/KERM-LITE-2/
RUN yarn install --network-concurrency 1
CMD ["npm", "start"]
