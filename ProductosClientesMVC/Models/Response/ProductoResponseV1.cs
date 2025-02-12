using System.ComponentModel.DataAnnotations;

namespace ProductosClientesMVC.Models.Response
{
    public class ProductoResponseV1
    {
        public int ProductoID { get; set; }
        public string Nombre { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
    }
}
