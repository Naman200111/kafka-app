Admin: Infra setup Topics / Parts
Producer: Message Produce
Consumer: Message Consume

Up Kafka ->
docker run -p 9092:9092 \
>> -e KAFKA_ZOOKEEPER_CONNECT=192.168.0.108:2181
>> -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.0.108:9092
>> -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
>> confluentinc/cp-kafka

ZooKeeper ->
docker run -p 2181:2181 zookeeper

GIST: https://gist.github.com/piyushgarg-dev/32cadf6420c452b66a9a6d977ade0b01