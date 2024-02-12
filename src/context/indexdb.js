import Dexie from "dexie";

const db = new Dexie("MyDatabase");
db.version(1).stores({
  myObjectStore: "headerName,field,filter,sortable",
  // Define other object stores as needed
});

export default db;
