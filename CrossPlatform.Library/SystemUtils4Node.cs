using System;
using System.Runtime;
using System.Threading.Tasks;

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
