using System;
using Newtonsoft.Json;

namespace ProjectManager.Entities.Utilities {
	public static class ConvertHelper {
		public static decimal ToDecimal(this object input)
		{
			try {
				return Convert.ToDecimal(input);
			}
			catch {
				return 0;
			}
		}

		public static int ToInt(this object input)
		{
			try {
				return Convert.ToInt32(input);
			}
			catch {
				return 0;
			}
		}

		public static string ToString(this object input)
		{
			try {
				return Convert.ToString(input);
			}
			catch {
				return string.Empty;
			}
		}

		public static decimal MathRound(this decimal input, int decimals = 0)
		{
			try {
				return Math.Round(input, decimals);
			}
			catch {
				return input;
			}
		}

		public static T JsonToObject<T>(this string jsonString)
		{			
			return JsonConvert.DeserializeObject<T>(jsonString);
		}

        public static DateTime? ToDateTime(this string dateTime)
        {
            try
            {
                var result = DateTime.Parse(dateTime);

                return result;
            }
            catch (Exception)
            {
                return null;
            }
        }
	}
}
