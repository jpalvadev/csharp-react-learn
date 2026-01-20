
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace MoviesAPI.Services
{
    public class AzureFileStorage : IFileStorage
    {
        private readonly BlobServiceClient blobServiceClient;

        public AzureFileStorage(BlobServiceClient blobServiceClient)
        {
            this.blobServiceClient = blobServiceClient;
        }
        public async Task Delete(string? route, string container)
        {
            if (string.IsNullOrEmpty(route))
            {
                return;
            }

            var containerClient =
                blobServiceClient.GetBlobContainerClient(container);
            var fileName = Path.GetFileName(route);
            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.DeleteIfExistsAsync();
        }

        public async Task<string> Store(string container, IFormFile file)
        {
            var containerClient =
                blobServiceClient.GetBlobContainerClient(container);

            await containerClient.CreateIfNotExistsAsync();

            containerClient.SetAccessPolicy(PublicAccessType.Blob);

            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";

            var blobClient = containerClient.GetBlobClient(fileName);

            var blobHttpHeaders = new BlobHttpHeaders();
            blobHttpHeaders.ContentType = file.ContentType;

            //using var stream = file.OpenReadStream();
            //await blobClient.UploadAsync(stream, overwrite: true);
            await blobClient.UploadAsync(file.OpenReadStream(), blobHttpHeaders);

            return blobClient.Uri.ToString();
        }
    }
}
