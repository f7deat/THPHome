using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;

namespace ApplicationCore.Helpers
{
    public static class SessionExtensions
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            session.Set(key, JsonHelper.SerializeAsync(value));
        }

        //public static T Get<T>(this ISession session, string key)
        //{
        //    var value = session.GetString(key);

        //    return value == null ? default(T) :
        //        JsonSerializer.DeserializeAsync<T>(value);
        //}
    }
}
