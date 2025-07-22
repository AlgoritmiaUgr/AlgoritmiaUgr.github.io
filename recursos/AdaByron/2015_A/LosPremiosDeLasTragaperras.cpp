#include <iostream>
using namespace std;

int main(){
    int n;
    cin >> n;
    int longitud;
    int curr;
    int max=0;
    while (n!=0){
        for(int i=0; i<n; i++){
            cin >> curr;
            if(curr > max){
                max = curr;
            }
        }
        cout << max+1 << endl;
        max = 0;
        curr= 0;
        cin >> n;  
    }
    return 0;
}