﻿using Newtonsoft.Json;

namespace WebUI.ExternalAPI.Models;

public class ZaloArticleResponse
{
    [JsonProperty("error")]
    public int Error { get; set; }
    [JsonProperty("message")]
    public string? Message { get; set; }
    [JsonProperty("data")]
    public ZaloArticleResponseData? Data { get; set; }
}

public class ZaloArticleResponseData
{
    [JsonProperty("token")]
    public string? Token { get; set; }
}