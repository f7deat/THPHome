namespace THPCore.Interfaces;

public interface IEmailSender
{
    Task<string> SendAsync(string receiver, string subject, string message);
}
