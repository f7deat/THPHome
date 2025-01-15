namespace THPHome.Models.ComponentModel;

public class Dropdown
{
    public string? Name { get; set; }
    public string? Icon { get; set; }
    public string? ButtonClassName { get; set; }
    public string MenuClassName { get; set; } = "hidden absolute shadow z-10 bg-white border-b-4 border-gray-800 min-w-full md:min-w-64";
    public List<DropdownItem> DropdownItems { get; set; } = [];
}

public class DropdownItem
{
    public string? Name { get; set; }
    public string? Url { get; set; }
    public string ClassName { get; set; } = "py-2 px-4 hover:bg-gray-200 block text-gray-800";
}
