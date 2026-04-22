@echo off
robocopy "C:\Users\anshu\Documents\Coding\qbridge" "C:\Users\anshu\Documents\GitHub\qbridge" /MIR /XD .git
git -C "C:\Users\anshu\Documents\GitHub\qbridge" add .
git -C "C:\Users\anshu\Documents\GitHub\qbridge" commit -m "update"
git -C "C:\Users\anshu\Documents\GitHub\qbridge" push origin main
echo Done!
pause