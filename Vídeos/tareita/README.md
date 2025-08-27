##  Taller 

Resuelve los siguientes ejercicios usando `mongosh`.

## Ejercicio 1  

```
db.usuarios.createIndex({edad: 1 });

db.usuarios.find({edad: { $gt: 30 } });
```

##  Ejercicio 2  
```
db.usuarios.createIndex({ nombre: 1 }, { unique: true });

db.usuarios.insertOne({
  nombre: "Carlos",
  edad: 31,
  ciudad: "Cartagena",
  correo: "carlos.dup@example.com"
}); 
```

##  Ejercicio 3  

```
db.usuarios.updateMany({}, {
  $set: {
    perfil: {
      ocupacion: "Desarrollador",
      nivel_estudios: "Universitario"
    }
  }
});

db.usuarios.createIndex({ "perfil.ocupacion": 1 });

db.usuarios.find({"perfil.ocupacion": "Desarrollador" });
```


##  Ejercicio 4  

```
db.usuarios.updateMany({}, {
  $set: {
    habilidades: ["JavaScript", "MongoDB", "Node.js"]
  }
});

db.usuarios.createIndex({habilidades: 1 });

db.usuarios.find({habilidades: "MongoDB" });
```


##  Ejercicio 5  

```
db.usuarios.dropIndex("ciudad_1_edad_-1");

db.usuarios.createIndex({edad: 1, ciudad: 1 });

```
: