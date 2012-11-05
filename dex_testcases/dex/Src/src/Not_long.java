public class Not_long {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		NLong i = new NLong();

		//System.out.println("Result is -500000l");
		System.out.println(i.not(500000l));

	}

}

class NLong {
	public long not(long i) {
		return -i;
	}
}