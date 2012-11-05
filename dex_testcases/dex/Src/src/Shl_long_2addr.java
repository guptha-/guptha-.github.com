public class Shl_long_2addr {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		// Shifts the bits of n left p positions.
		// Zero bits are shifted into the low-order positions.

		long c;
		c = 5000000000l << 3;
		c += 1;
		//System.out.println("Result should be 40000000001l");
		System.out.println(c);

	}

}
