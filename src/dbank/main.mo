import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 100;
  stable var startTime = Time.now();

  public func topUp(amount: Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdrawl(amount: Float) {
    let tempValue: Float = currentValue - amount;
    if(tempValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print(debug_show("'currentValue' can't be Int type as it is Nat type"));
    } 
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeEllapsedNS = currentTime - startTime;
    let timeEllapsedS = timeEllapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeEllapsedS));
    startTime := currentTime;
  };

  public func resetCurrentValue() {
    currentValue := 50;
  }

}