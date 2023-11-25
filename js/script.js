function convertir() {
    const cantidad = parseFloat(document.getElementById('amount').value);
    if (isNaN(cantidad) || cantidad <= 0) {
        alert('Ingrese una cantidad válida.');
        return;
    }

    const seleccion = document.getElementById('conversionType').value;
    console.log(seleccion);
    let url;
    let tasaCambio;
    url = 'https://dolarapi.com/v1/dolares/blue';

    document.getElementById('resultado').innerText = 'Cotizando...';

    setTimeout(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (seleccion === 'aDolares') {
                    const resultado = cantidad / data.venta;
                    document.getElementById('resultado').innerText = `Resultado: ${resultado.toFixed(2)} Dólares`;
                }else{
                    const resultado = cantidad * data.compra;
                    document.getElementById('resultado').innerText = `Resultado: ${resultado.toFixed(2)} Pesos Argentinos`;
                }
                console.log(tasaCambio);
            })
            .catch(error => {
                console.error('Error al obtener la tasa de cambio:', error);
                alert('Hubo un error al obtener la tasa de cambio. Por favor, inténtelo de nuevo más tarde.');
                document.getElementById('resultado').innerText = '';
            });
    }, 2000);
}