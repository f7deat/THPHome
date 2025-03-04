using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using THPCore.Models;
using THPHome.Data;
using THPHome.Interfaces.IService;

namespace THPHome.Services.Contacts;

public class ContactService(ApplicationDbContext _context) : IContactService
{
    public async Task<THPResult<byte[]>> ExportAsync()
    {
        var query = from a in _context.Contacts
                    join b in _context.ContactStatuses on a.ContactStatusId equals b.Id
                    orderby a.CreatedDate descending
                    select new
                    {
                        a.Id,
                        a.FullName,
                        a.PhoneNumber,
                        a.Address,
                        a.School,
                        a.CreatedDate,
                        a.Email,
                        a.Note,
                        Status = b.Name
                    };
        var contacts = await query.AsNoTracking().ToListAsync();
        using var pgk = new ExcelPackage();
        using var ws = pgk.Workbook.Worksheets.Add("Danh sách liên hệ");
        ws.Cells["A1"].Value = "STT";
        ws.Cells["B1"].Value = "Họ và tên";
        ws.Cells["C1"].Value = "Số điện thoại";
        ws.Cells["D1"].Value = "Địa chỉ";
        ws.Cells["E1"].Value = "Trường";
        ws.Cells["F1"].Value = "Email";
        ws.Cells["G1"].Value = "Ghi chú";
        ws.Cells["H1"].Value = "Trạng thái";
        ws.Cells["I1"].Value = "Ngày tạo";
        var row = 2;
        foreach (var contact in contacts)
        {
            ws.Cells[$"A{row}"].Value = row - 1;
            ws.Cells[$"B{row}"].Value = contact.FullName;
            ws.Cells[$"C{row}"].Value = contact.PhoneNumber;
            ws.Cells[$"D{row}"].Value = contact.Address;
            ws.Cells[$"E{row}"].Value = contact.School;
            ws.Cells[$"F{row}"].Value = contact.Email;
            ws.Cells[$"G{row}"].Value = contact.Note;
            ws.Cells[$"H{row}"].Value = contact.Status;
            ws.Cells[$"I{row}"].Value = contact.CreatedDate.ToString("dd/MM/yyyy HH:mm:ss");
            row++;
        }
        ws.Row(1).Style.Font.Bold = true;
        for (int i = 1; i < 10; i++)
        {
            ws.Column(i).AutoFit();
        }
        var cellRange = ws.Cells[ws.Dimension.Address];
        cellRange.Style.Border.Top.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
        cellRange.Style.Border.Bottom.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
        cellRange.Style.Border.Left.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;
        cellRange.Style.Border.Right.Style = OfficeOpenXml.Style.ExcelBorderStyle.Thin;

        return THPResult<byte[]>.Ok(await pgk.GetAsByteArrayAsync());
    }
}
