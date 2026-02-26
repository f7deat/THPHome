namespace THPHome.Models.Args.VideoBulletin;
public class VideoBulletinCreateArgs
{
    public int Volume { get; set; }
    public string? YoutubeId { get; set; }
}

public class VideoBulletinUpdateArgs : VideoBulletinCreateArgs
{
    public Guid Id { get; set; }
}