using System;
using System.Runtime;
using System.Threading.Tasks;

namespace CrossPlatform.Library
{
    public class SystemUtils4Node
    {
        public async Task<object> WhatIsTime(dynamic input)
        {
            string result = SystemUtils.WhatIsTime();

            return result;
        }
    }
}
