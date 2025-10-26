using System.Text.RegularExpressions;

namespace API.Utils
{
    public class ApiException(string identifier, string message) : Exception
    {
        private readonly string identifier = identifier;
        private readonly string message = message;

        public string Identifier { get { return identifier; } }
        
        override
        public string Message {  get { return message; } }
    
    }

    public static class Validators
    {
        public static void Equals(string propertyName, bool value, bool expected)
        {
            if (value != expected)
                throw new ApiException(Errors.NotEquals, $"{propertyName}='{value}' é diferente de {expected}.");
        }

        public static void Found(string propertyName, string propertyValue, object? value)
        {
            if (value == null)
                throw new ApiException(Errors.NotFound, $"{propertyName}='{propertyValue}' não encontrado.");
        }

        public static void Owner(string modelName, string userId, string entityId)
        {
            if (!string.IsNullOrEmpty(entityId) && userId != entityId)
                throw new ApiException(Errors.NotOwner, $"Usuário='{userId}' não é proprietário de {modelName}='{entityId}'.");
        }

        public static void Length(string propertyName, string value, int min, int max)
        {
            var length = value.Length;
            if (!(length >= min && length <= max))
                throw new ApiException(Errors.InvalidValue, $"{propertyName} possui tamanho inválido ({length})");
        }

        public static void Match(string propertyName, Regex regex, string value)
        {
            NotEmpty(propertyName, value);
            if (!regex.IsMatch(value))
                throw new ApiException(Errors.InvalidValue, $"{propertyName} não atende ao padrão");
        }

        public static void NotEmpty(string propertyName, string? value)
        {
            if (string.IsNullOrEmpty(value))
                throw new ApiException(Errors.InvalidValue, $"{propertyName} não pode ser nulo ou vazio.");
        }

        public static void NotFound(string propertyName, string propertyValue, object? value)
        {
            if (value != null)
                throw new ApiException(Errors.InvalidValue, $"{propertyName}='{propertyValue}' foi encontrado.");
        }

        public static void Valid(string propertyName, bool isValid)
        {
            if (!isValid)
                throw new ApiException(Errors.InvalidValue, $"{propertyName} não é válido.");
        }
    }
}
