﻿namespace THPHome.Entities.Users;

public class Award : THPIdentity.Entities.Award
{
    public string UserName { get; set; } = default!;
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
}
