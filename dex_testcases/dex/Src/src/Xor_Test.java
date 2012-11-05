public class Xor_Test {

	public void Xor_int_2addr() {

		/**
		 * @param args
		 */

		int a = 15;
		int b = 8;
		int c = 0;
		// XOR operation =a ^ b
		c = a ^ b;
		c += 1;
		System.out.println("a ^ b = 8");
		System.out.println(c);

	};

	public void Xor_int_lit16() {

		/**
		 * @param args
		 */

		int a = 15;
		int b = 8;
		int c = 0;
		// XOR operation =a ^ b
		c = a ^ b;
		System.out.println("a ^ b = 7");
		System.out.println(c);

	};

	public void Xor_int_lit8() {

		/**
		 * @param args
		 */
		int a = 15;
		int b = 8;
		int c = 0;
		// XOR operation =a ^ b
		c = a ^ b;

		System.out.println("a ^ b = 7");
		System.out.println(c);

	};

	public void Xor_int() {

		/**
		 * @param args
		 */

		int a = 15;
		int b = 8;
		int c = 0;
		// AND operation =a ^ b
		c = a ^ b;
		System.out.println("a ^ b = 7 ");
		System.out.println(c);

	};

	public void Xor_long_2addr() {

		/**
		 * @param args
		 */

		long a = 23423432423777l;
		long b = 23423432423778l;
		long c = 0;
		// XOR operation =a ^ b
		c = a ^ b;
		c += 1;
		System.out.println("a ^ b = 4");
		System.out.println(c);

	};

	public void Xor_long() {

		/**
		 * @param args
		 */

		long a = 23423432423777l;
		long b = 23423432423778l;
		long c = 0;
		// XOR operation =a ^ b
		c = a ^ b;
		System.out.println("a ^ b = 3");
		System.out.println(c);

	};
	

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Xor_Test x = new Xor_Test();
		x.Xor_int_2addr();
		x.Xor_int_lit16();
		x.Xor_int_lit8();
		x.Xor_int();
		x.Xor_long_2addr();
		x.Xor_long();

	}

}

