namespace CrossPlatform.Library
{
    public class SystemUtils4Node
    {
        public async Task<object> WhatIsTime()
        {
            string result = SystemUtils.WhatIsTime();

            return result;
        }
    }
}
