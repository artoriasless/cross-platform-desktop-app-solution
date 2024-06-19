namespace CrossPlatform.Library
{
    public class SystemUtils
    {
        public static string WhatIsTime()
        {
            string now = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");

            return now;
        }
    }
}
