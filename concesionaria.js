const autos = require('./autos');

const concesionaria = {
    autos: autos,
    buscarAuto: function (patente) {
        let busquedaPatente = autos.find(auto => auto.patente === patente);
        if (busquedaPatente) {
            return busquedaPatente;
        } else {
            return null;
        }
    },
    venderAuto: function (patente) {
        let busquedaVendido = this.buscarAuto(patente);
        if (busquedaVendido) {
            busquedaVendido.vendido = true;
            return busquedaVendido;
        } else {
            return null;
        }
    },
    autosParaLaVenta: function () {
        return autos.filter(vendidos => vendidos.vendido == false)
    },

    autosNuevos: function () {
        let busqueda0km = this.autosParaLaVenta();
        return busqueda0km.filter(nuevos => nuevos.km < 100);
    },
    listaDeVentas: function () {
        let ventas = this.autosParaLaVenta();
        return ventas.map(ventasRealizadas => ventasRealizadas.precio);
    },
    totalDeVentas: function () {
        let ventas_totales = this.listaDeVentas();
        return ventas_totales.reduce((acumVentas, ventasTotales) => {
            return acumVentas + ventasTotales;
        }, 0)
    },
    puedeComprar: function (auto, persona) {
        let precioCuotas = (auto.precio / auto.cuotas);
        return (auto.precio <= persona.capacidadDePagoTotal && precioCuotas <= persona.capacidadDePagoEnCuotas);
    },
    autosQuePuedeComprar: function (persona) {
        let disponibilidadAutos = this.autosParaLaVenta();
        let autosQuePuedeComprar = disponibilidadAutos.filter((auto) => {
            return concesionaria.puedeComprar(auto, persona)
        }); return autosQuePuedeComprar;
    }
};