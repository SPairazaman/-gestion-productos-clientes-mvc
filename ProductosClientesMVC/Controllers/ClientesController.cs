using Microsoft.AspNetCore.Mvc;
using ProductosClientesMVC.Models.Request;
using ProductosClientesMVC.Models.Response;
using System.Text;
using System.Text.Json;

namespace ProductosClientesMVC.Controllers
{
    public class ClientesController : Controller
    {
        string url = "https://localhost:7104/api/Clientes";

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
                

                HttpResponseMessage response = await client.GetAsync(url);

                List<ClienteResponseV1> clientes = null;

                if (response.IsSuccessStatusCode)
                {
                    string JsonResponse= await response.Content.ReadAsStringAsync();
                    clientes = JsonSerializer.Deserialize<List<ClienteResponseV1>>(JsonResponse,new JsonSerializerOptions { PropertyNameCaseInsensitive=true });
                }
                else
                {
                    return new JsonResult(new {success=false, message = $"Hubo un errror: {response.StatusCode}", icon = "error" });
                    clientes = new List<ClienteResponseV1>();
                }

                return Json(new {success=true,clientes= clientes });
            }
            catch (Exception)
            {
                return Json(new {success=false, message = "Error, Contáctese con el administrador", icon = "error" });   
            }
        }

        public async Task<JsonResult> CreateAsync(ClienteRequestV1 request)
        {
            try
            {
                using HttpClient httpClient= new HttpClient();
                String JsonRequest = JsonSerializer.Serialize(request);
                HttpContent content = new StringContent(JsonRequest,Encoding.UTF8,"application/json");
                HttpResponseMessage response= await httpClient.PostAsync(url, content);
                if (response.IsSuccessStatusCode) {
                    string JsonResponse=await response.Content.ReadAsStringAsync();
                    return new JsonResult(new { success = true, message = "Cliente registrado correctamente", icon = "success" });
                }
                else
                {
                    return new JsonResult(new { message = $"Hubo un errror: {response.StatusCode}", icon = "error" });
                }

            }
            catch (Exception)
            {
                return Json(new { message = "Error, Contáctese con el administrador", icon = "error" });
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
                    return new JsonResult(new { success = true, message = "Cliente eliminado correctamente", icon = "success" });
                }
                else
                {
                    return new JsonResult(new { success = false, message = $"Hubo un errror: {response.StatusCode}", icon = "error" });
                }
            }
            catch (Exception)
            {
                return Json(new { success = false, message = "Error, Contáctese con el administrador", icon = "error" });
            }

        }


    }
}
