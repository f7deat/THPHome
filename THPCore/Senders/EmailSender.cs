using Microsoft.Extensions.Configuration;
using System.Net.Mail;
using System.Net;
using THPCore.Interfaces;

namespace THPCore.Senders;

public class EmailSender : IEmailSender
{
    private readonly IConfiguration _configuration;
    public EmailSender(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<string> SendAsync(string receiver, string subject, string message)
    {
        try
        {
            var password = _configuration["Settings:EmailPassword"];
            var senderEmail = new MailAddress("info@dhhp.edu.vn", "Trường Đại Học Hải Phòng");
            var receiverEmail = new MailAddress(receiver);
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(senderEmail.Address, password)
            };
            using var mess = new MailMessage(senderEmail, receiverEmail)
            {
                Subject = subject,
                Body = message,
                IsBodyHtml = true
            };
            await smtp.SendMailAsync(mess);
            return string.Empty;
        }
        catch (Exception ex)
        {
            return ex.ToString();
        }
    }
}
