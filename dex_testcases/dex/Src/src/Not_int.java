public class Not_int {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		NInt i = new NInt();

		//System.out.println("Result is -5");
		System.out.println(i.nop(5));

	}

}

class NInt {
	public int nop(int i) {
		return -i;
	}
}