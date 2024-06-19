using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CrossPlatform.Library;

namespace CrossPlatform.LibTest
{
    public class SystemUtilsTester
    {
        public SystemUtilsTester()
        {

        }

        public void Run()
        {
            this.Test_WhatIsTime();
        }

        private void Test_WhatIsTime()
        {
            string now = SystemUtils.WhatIsTime();

            Utils.LogModuleFunc(
                "SystemUtils.WhatIsTime",
                new List<string>(),
                new List<string>() { now }
            );
        }
    }
}
