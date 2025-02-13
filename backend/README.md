# PlantTrackerBackend

1. Backend został napisany w jave wersji 19 przy użyciu frameworka Springboot oraz projektu gradle.

2. Aby uruchomić backend, należy mieć zainstalowane powyższe zależności, oraz aplikację Docer, w którym uruchamiana jest baza danych PostgresSQL, dzięki komendzie:

```
docker run --name postgres-container -e POSTGRES_DB=plant_tracker_db -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

3. Następnie można wykonać polecenie:

```
gradle bootrun
```

w foldrze projketu gradle.