#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    bool si;
    while(n!=0){
        int prev=-1;
        int curr;
        si=true;
        for(int i=0; i<n; i++){
            cin >> curr;
            if(curr>prev){
                prev = curr;
            }
            else{
                si=false;
            }
        }
        if(si){
            cout << "SI" << endl;
        }
        else{
            cout << "NO" << endl;
        }
        cin >> n;
    }
    return 0;
        
}