from matplotlib.pyplot import sca


def main():
    curve = 'M0,0 L-0.5,0 C-0.75,0 -0.75,0.5 -0.5,0.5 C-0.05,0.5 -0.15,1.3 -1,1.5 C-0.15,1.5 -1,2.5 0,2.5'
    commands = curve.split(' ')
    controls = []
    scale = 2.5
    for command in commands:
        # print(f'Current Command: {command}')
        if command.startswith("M"):
            numbers = [float(x)/scale for x in command[1:].split(',')]
            print(f"path.moveTo({numbers[0]},{numbers[1]})")
        elif command.startswith("L"):
            numbers = [float(x)/scale for x in command[1:].split(',')]
            print(f'path.lineTo({numbers[0]},{numbers[1]})')
        elif command.startswith("C"):
            numbers = [float(x)/scale for x in command[1:].split(',')]
            controls = []
            controls.append(numbers[0])
            controls.append(numbers[1])
        else:
            numbers = [float(x)/scale for x in command.split(',')]
            controls.append(numbers[0])
            controls.append(numbers[1])
            if (len(controls) == 6):
                print(f'path.bezierCurveTo({controls[0]},{controls[1]},{controls[2]},{controls[3]},{controls[4]},{controls[5]})')



if __name__ == "__main__":
    main()