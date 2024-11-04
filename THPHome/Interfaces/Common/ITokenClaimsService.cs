using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.Common
{
    public interface ITokenClaimsService
    {
        Task<string> GetTokenAsync(string userName);
    }
}
