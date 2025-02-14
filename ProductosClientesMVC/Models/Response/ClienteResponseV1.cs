using System.ComponentModel.DataAnnotations;

namespace ProductosClientesMVC.Models.Response
{
    public class ClienteResponseV1
    {
        public int ClienteID { get; set; }
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public string? Telefono { get; set; }
    }
}
