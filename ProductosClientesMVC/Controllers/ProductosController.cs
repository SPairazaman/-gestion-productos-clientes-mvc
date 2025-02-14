using Microsoft.AspNetCore.Mvc;
using ProductosClientesMVC.Models.Request;
using ProductosClientesMVC.Models.Response;
using System.Text;
using System.Text.Json;

namespace ProductosClientesMVC.Controllers
{
    public class ProductosController : Controller
    {
        string url = "https://localhost:7104/api/Productos";

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetAsync(string? filtro)
        {
            try
            {
                HttpClient client = new HttpClient();
                url = url + "?filtro=" + filtro;

                HttpResponseMessage response= await client.GetAsync(url);

                List<ProductoResponseV1> productos = null;

                if (response.IsSuccessStatusCode)
                {
                    string JsonResponse= await response.Content.ReadAsStringAsync();
                    productos = JsonSerializer.Deserialize<List<ProductoResponseV1>>(JsonResponse, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                }
                else
                {
                    return new JsonResult(new {success=false, message = $"Hubo un errror: {response.StatusCode}", icon = "error" });
                    productos = new List<ProductoResponseV1>(); 
                }
                return Json(new  {  success = true, productos = productos });
                //return Json(productos);
            }
            catch (Exception)
            {
                return Json(new {success=false, message = "Error, Contáctese con el administrador", icon = "error" });
            }
        }

        public async Task<JsonResult> CreateAsync(ProductoRequestV1 request)
        {
            try
            {
                using HttpClient httpClient = new HttpClient();

                string JsonRequest =JsonSerializer.Serialize(request);
                HttpContent content = new StringContent(JsonRequest, Encoding.UTF8, "application/json");
                HttpResponseMessage response= await httpClient.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    string JsonResponse = await response.Content.ReadAsStringAsync();
                    return new JsonResult(new {message = "Producto registrado correctamente",icon="success" });
                }
                else
                {
                    return new JsonResult(new { message = $"Hubo un errror: {response.StatusCode}", icon="error" });
                }
            }
            catch (Exception)
            {
                return Json(new { message = "Error, Contáctese con el administrador", icon = "error"});
            }
        }

        public async Task<JsonResult> DeleteAsync(int id)
        {

            try
            {
                using HttpClient httpClient = new HttpClient();
                url = url + "?id=" + id;

                HttpResponseMessage response = await httpClient.DeleteAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string JsonResponse = await response.Content.ReadAsStringAsync();
                    return new JsonResult(new {success=true, message = "Producto eliminado correctamente", icon = "success" });
                }
                else
                {
                    return new JsonResult(new {success=false, message = $"Hubo un errror: {response.StatusCode}", icon = "error" });
                }
            }
            catch (Exception)
            {
                return Json(new { success=false,message = "Error, Contáctese con el administrador", icon = "error" });
            }

        }

    }
}
