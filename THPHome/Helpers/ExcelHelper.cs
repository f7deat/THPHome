using ApplicationCore.Entities;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THPHome.Entities;
using THPHome.Enums;

namespace ApplicationCore.Helpers
{
    public class ExcelHelper
    {
        public static async Task<byte[]> ExportProduct(IReadOnlyList<Post> posts, IReadOnlyList<Category> categories, IReadOnlyList<PostCategory> postCategories)
        {
            using ExcelPackage package = new ExcelPackage();
            ExcelWorksheet worksheet = package.Workbook.Worksheets.Add(nameof(Post));
            int totalRows = posts.Count() + 1;
            worksheet.Cells[1, 1].Value = "Id";
            worksheet.Cells[1, 2].Value = "Title";
            worksheet.Cells[1, 3].Value = "Url";
            worksheet.Cells[1, 4].Value = "Description";
            worksheet.Cells[1, 5].Value = "Content";
            worksheet.Cells[1, 6].Value = "ModifiedDate";
            worksheet.Cells[1, 7].Value = "CreatedBy";
            worksheet.Cells[1, 8].Value = "Thumbnail";
            worksheet.Cells[1, 9].Value = "View";
            worksheet.Cells[1, 10].Value = "Status";
            worksheet.Cells[1, 11].Value = "Tags";
            worksheet.Cells[1, 12].Value = "Type";
            worksheet.Cells[1, 13].Value = "CreatedDate";
            worksheet.Cells[1, 14].Value = "ModifiedBy";
            int i = 0;
            for (int row = 2; row <= totalRows; row++)
            {
                worksheet.Cells[row, 1].Value = posts[i].Id;
                worksheet.Cells[row, 2].Value = posts[i].Title;
                worksheet.Cells[row, 3].Value = posts[i].Url;
                worksheet.Cells[row, 4].Value = posts[i].Description;
                worksheet.Cells[row, 5].Value = posts[i].Content;
                worksheet.Cells[row, 6].Value = posts[i].ModifiedDate;
                worksheet.Cells[row, 7].Value = posts[i].CreatedBy;
                worksheet.Cells[row, 8].Value = posts[i].Thumbnail;
                worksheet.Cells[row, 9].Value = posts[i].View;
                worksheet.Cells[row, 10].Value = posts[i].Status;
                worksheet.Cells[row, 11].Value = posts[i].Tags;
                worksheet.Cells[row, 12].Value = posts[i].Type;
                worksheet.Cells[row, 13].Value = posts[i].CreatedDate;
                worksheet.Cells[row, 14].Value = posts[i].ModifiedBy;
                i++;
            }

            worksheet.Column(6).Style.Numberformat.Format = "yyyy-mm-dd hh:mm:ss";
            worksheet.Column(13).Style.Numberformat.Format = "yyyy-mm-dd hh:mm:ss";

            // Category
            ExcelWorksheet worksheet2 = package.Workbook.Worksheets.Add(nameof(Category));
            totalRows = categories.Count() + 1;
            worksheet2.Cells[1, 1].Value = "Id";
            worksheet2.Cells[1, 2].Value = "Name";
            worksheet2.Cells[1, 3].Value = "Description";
            worksheet2.Cells[1, 4].Value = "ParrentId";
            worksheet2.Cells[1, 5].Value = "Url";
            worksheet2.Cells[1, 6].Value = "Thumbnail";
            i = 0;
            for (int row = 2; row < totalRows; row++)
            {
                worksheet2.Cells[row, 1].Value = categories[i].Id;
                worksheet2.Cells[row, 2].Value = categories[i].Name;
                worksheet2.Cells[row, 3].Value = categories[i].Description;
                worksheet2.Cells[row, 4].Value = categories[i].ParrentId;
                worksheet2.Cells[row, 5].Value = categories[i].NormalizeName;
                worksheet2.Cells[row, 6].Value = categories[i].Thumbnail;
                i++;
            }

            // Post Category
            ExcelWorksheet worksheet3 = package.Workbook.Worksheets.Add(nameof(PostCategory));
            totalRows = postCategories.Count() + 1;
            worksheet3.Cells[1, 1].Value = "PostId";
            worksheet3.Cells[1, 2].Value = "CategoryId";
            i = 0;
            for (int row = 2; row < totalRows; row++)
            {
                worksheet3.Cells[row, 1].Value = postCategories[i].PostId;
                worksheet3.Cells[row, 2].Value = postCategories[i].CategoryId;
                i++;
            }

            return await package.GetAsByteArrayAsync();
        }

        public static List<Post> ImportPost(IFormFile file)
        {
            try
            {
                using ExcelPackage package = new ExcelPackage(file.OpenReadStream());
                ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                int colCount = worksheet.Dimension.End.Column;  //get Column Count
                int rowCount = worksheet.Dimension.End.Row;     //get row count
                var posts = new List<Post>();
                for (int row = 2; row <= rowCount; row++)
                {
                    var post = new Post
                    {
                        Title = worksheet.Cells[row, 2].Value?.ToString() ?? string.Empty,
                        Url = worksheet.Cells[row, 3].Value?.ToString() ?? string.Empty,
                        Description = worksheet.Cells[row, 5].Value?.ToString(),
                        Content = worksheet.Cells[row, 6].Value?.ToString(),
                        CreatedDate = DateTime.Now,
                        Thumbnail = worksheet.Cells[row, 9].Value?.ToString(),
                        View = int.Parse(worksheet.Cells[row, 10].Value?.ToString() ?? "0"),
                        CreatedBy = worksheet.Cells[row, 8].Value?.ToString(),
                        ModifiedBy = worksheet.Cells[row, 8].Value?.ToString(),
                        ModifiedDate = DateTime.Now,
                        Status = PostStatus.PUBLISH
                    };
                    posts.Add(post);
                }
                return posts;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return new List<Post>();
            }
        }
    }
}
