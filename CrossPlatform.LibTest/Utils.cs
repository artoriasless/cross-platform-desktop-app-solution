using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrossPlatform.LibTest
{
    public class Utils
    {
        public static void LogModuleFunc(string funcName, List<string> paramIn, List<string> results)
        {
            Console.WriteLine("-------------------------------------------------------");
            
            Console.WriteLine("  【方法名】" + funcName);
            Console.WriteLine("-");
            
            if (paramIn.Count == 0)
            {
                Console.WriteLine("【入参列表】空");
                Console.WriteLine("-");
            } else
            {
                Console.WriteLine("【入参列表】");

                for (int i = 0; i < paramIn.Count; i++)
                {
                    // 自动补零，形如 01. xxx 格式
                    Console.WriteLine((i + 1).ToString("D2") + ". " + paramIn[i]);
                }

                Console.WriteLine("-");
            }

            if (results.Count == 0)
            {
                Console.WriteLine("【出参列表】空");
                Console.WriteLine("-");
            } else
            {
                Console.WriteLine("【出参列表】");

                for (int i = 0; i < results.Count; i++)
                {
                    // 自动补零，形如 01. xxx 格式
                    Console.WriteLine((i + 1).ToString("D2") + ". " + results[i]);
                }
            }

            Console.WriteLine("-------------------------------------------------------");
        }
    }
}
