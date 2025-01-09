const suma = (...numbers) => {
  if (numbers.length === 0) {
    return 0;
  }
  const some = numbers.some((num) => typeof num !== "number");
  if (some) {
    return null;
  }
  const sum = numbers.reduce((acc, val) => acc + val);
  return sum;
};

let contadorPruebas = 0;
let contadorPruebasOk = 0;

/* T1: devuelve null si algun parametro no es numerico */
function test1() {
  contadorPruebas++;
  const resultado = suma("hola", "chau");
  if (resultado === null) {
    contadorPruebasOk++;
    console.log("TEST 1: OK");
  } else {
    console.log(
      "TEST 1: FALLÓ (devuelve null si algun parametro no es numerico)"
    );
  }
}
test1();

/* T2: devuelve 0 si no recibe argumentos */
function test2() {
  contadorPruebas++;
  const resultado = suma();
  if (resultado === 0) {
    contadorPruebasOk++;
    console.log("TEST 2: OK");
  } else {
    console.log("TEST 2: FALLÓ (devuelve 0 si no recibe argumentos)");
  }
}
test2();

/* T3: devuelve correctamente la suma de dos numeros */
function test3() {
  contadorPruebas++;
  const resultado = suma(2, 12);
  if (resultado === 14) {
    contadorPruebasOk++;
    console.log("TEST 3: OK");
  } else {
    console.log(
      "TEST 3: FALLÓ (devuelve correctamente la suma de dos numeros)"
    );
  }
}
test3();

/* T4: devuelve correctamente la suma de cualquier cantidad de numeros */
function test4() {
  contadorPruebas++;
  const resultado = suma(10, 10, 10, 10, 10);
  if (resultado === 50) {
    contadorPruebasOk++;
    console.log("TEST 4: OK");
  } else {
    console.log(
      "TEST 4: FALLÓ (devuelve correctamente la suma de cualquier cantidad de numeros)"
    );
  }
}
test4();

console.log({ contadorPruebas, contadorPruebasOk });
