public class Sub_long_2addr {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		long x, y, z;
		x = 12345678l;
		y = 87654321l;
		z = x - y;
		z += 1;
		//System.out.println("Result should be -75308642");
		System.out.println(z);

	}

}